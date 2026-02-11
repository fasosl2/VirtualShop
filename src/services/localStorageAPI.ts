interface HasId {
    _id: number;
}

export const generateId = (table: HasId[]): number => {
    return table.reduce((prev, current) => (prev > current._id) ? prev : current._id, 0) + 1;
}

export const saveStoredTable = async (table: any, tableName: string): Promise<void> => {
    localStorage.setItem(tableName, JSON.stringify(table));
}

export const getStoredTable = async (tableName: string, defaultObject?: any): Promise<any> => {
    const item = localStorage.getItem(tableName);
    if (item) {
        return JSON.parse(item);
    }
    return defaultObject ? defaultObject : [];
}

export const getStoredItem = async (itemName: string): Promise<any> => {
    const item = localStorage.getItem(itemName);
    return item ? JSON.parse(item) : null;
}

export const setStoredItem = async (itemName: string, item: any): Promise<void> => {
    return localStorage.setItem(itemName, JSON.stringify(item));
}
