export const generateId = (table)=>{
    return table.reduce((prev, current) => (prev > current.id) ? prev : current.id, 0) + 1
}

export const saveStoredTable = async (table,tableName)=>{
    localStorage.setItem(tableName,JSON.stringify(table))
}

export const getStoredTable = async (table,defaultObject) => {
    return JSON.parse(localStorage.getItem(table)) || (defaultObject ? defaultObject : []);
}

export const getStoredItem = async (itemName) => {
    return JSON.parse(localStorage.getItem(itemName));
}

export const setStoredItem = async (itemName,item) => {
    return localStorage.setItem(itemName,JSON.stringify(item));
}