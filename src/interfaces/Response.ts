export interface IPaginatedResponse<T> {
  list?: T[];         // Array dos itens (ex: ICalendar[] ou IProduct[])
  page?: number;      // Página atual
  pages?: number;     // Total de páginas
  total?: number;     // Total de itens no banco
  message?: string;   // Mensagem de erro ou status
}


export interface ApiResponse {
  [key: string]: any;
}