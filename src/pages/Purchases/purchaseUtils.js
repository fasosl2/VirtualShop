import ExcelJS from 'exceljs';

export const handlePrintPurchases = (purchasesProcessed) => {
    if (purchasesProcessed.length === 0) return;

    const printWindow = window.open("", "", "height=800,width=600");
    const purchasesHTML = purchasesProcessed.map(purchase => {
        let cardHTML = `<div class="purchase-card">`;
        cardHTML += `<h2>Pedido: ${purchase._id}</h2>`;
        const { user } = purchase;
        if (user) cardHTML += `<p><b>Cliente:</b> ${user.name}</p>`;
        if (purchase.user?.phone) cardHTML += `<p><b>Telefone:</b> ${purchase.user.phone}</p>`;
        if (user?.address) {
            const { street, number, neighborhood, city, uf, referencePoint } = user.address;
            const addressParts = [street, number, neighborhood, city, uf].filter(Boolean);
            let fullAddress = addressParts.join(', ');
            if (referencePoint) fullAddress += ` - Ponto de Referência: ${referencePoint}`;
            cardHTML += `<p><b>Endereço:</b> ${fullAddress}</p>`;
        }
        if (user?.observations) cardHTML += `<p><b>Observações:</b> ${user.observations}</p>`;
        if (purchase.deliveryDate) cardHTML += `<p><b>Data de Entrega:</b> ${new Date(purchase.deliveryDate).toLocaleDateString()}</p>`;
        if (purchase.paymentMethod) cardHTML += `<p><b>Forma de Pagamento:</b> ${purchase.paymentMethod}</p>`;
        if (purchase.paymentStatus) cardHTML += `<p><b>Status do Pagamento:</b> ${purchase.paymentStatus}</p>`;
        if (purchase.deliveryStatus) cardHTML += `<p><b>Status da Entrega:</b> ${purchase.deliveryStatus}</p>`;
        cardHTML += `<p><b>Produtos:</b></p><ul>`;
        purchase.products?.forEach(product => { cardHTML += `<li>${product.productDetails?.title}: ${product.count} unidades</li>`; });
        cardHTML += `</ul></div>`;
        return cardHTML;
    }).join('');

    printWindow.document.body.innerHTML = `
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .purchase-card { 
          border: 1px solid #ccc; 
          border-radius: 8px; 
          padding: 15px; 
          margin-bottom: 20px; 
          page-break-inside: avoid;
        }
        h2 { font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 10px; }
        p { margin: 5px 0; font-size: 14px; }
        ul { list-style-type: none; padding-left: 15px; }
        li { margin-bottom: 5px; font-size: 12px; }
      </style>
      <h1>Lista de Pedidos</h1>
      ${purchasesHTML}
    `;
    printWindow.document.title = "Lista de Pedidos";
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 250);
};

export const handleExportExcel = async (purchasesProcessed) => {
    if (purchasesProcessed.length === 0) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Pedidos");

    // 1. Cabeçalhos
    const productTitles = Array.from(
        new Set(
            purchasesProcessed.flatMap(p => p.products.map(prod => prod.productDetails?.title).filter(Boolean))
        )
    ).sort();

    worksheet.columns = [
        { header: "Ponto de Referência", key: "referencePoint", width: 30 },
        { header: "Bairro", key: "neighborhood", width: 25 },
        { header: "Nome do Cliente", key: "customerName", width: 35 },
        ...productTitles.map(title => ({
            header: title,
            key: title,
            width: 10,
            style: { alignment: { horizontal: 'center' } }
        }))
    ];

    // 2. Adicionar dados
    const customerData = new Map();

    purchasesProcessed.forEach(purchase => {
        const user = purchase.user;
        if (!user?._id) return; // Pula pedidos sem cliente associado

        // Se o cliente ainda não está no mapa, inicializa seus dados
        if (!customerData.has(user._id)) {
            customerData.set(user._id, {
                referencePoint: user.address?.referencePoint || '',
                neighborhood: user.address?.neighborhood || '',
                customerName: user.name || '',
                products: new Map() // Usaremos um mapa para somar os produtos
            });
        }

        const customerRecord = customerData.get(user._id);

        // Itera sobre os produtos do pedido atual e soma as quantidades
        purchase.products.forEach(product => {
            if (product.productDetails?.title) {
                const currentCount = customerRecord.products.get(product.productDetails.title) || 0;
                customerRecord.products.set(product.productDetails.title, currentCount + product.count);
            }
        });
    });

    // 3. Adiciona os dados consolidados dos clientes na planilha
    customerData.forEach(data => {
        const rowData = {
            referencePoint: data.referencePoint,
            neighborhood: data.neighborhood,
            customerName: data.customerName,
        };
        data.products.forEach((count, title) => {
            rowData[title] = count;
        });
        worksheet.addRow(rowData);
    });

    // 4. Aplicar estilo de rotação no cabeçalho dos produtos
    const headerRow = worksheet.getRow(1);
    headerRow.height = 80; // Aumenta a altura da linha do cabeçalho
    worksheet.columns.forEach((column, index) => {
        if (index >= 3) { // A partir da 4ª coluna (produtos)
            headerRow.getCell(index + 1).alignment = { vertical: 'middle', horizontal: 'center', textRotation: 90, wrapText: true };
        }
    });

    // 5. Gerar e baixar o arquivo
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'relatorio_pedidos.xlsx';
    link.click();
};