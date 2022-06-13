class LocalStorageService {
  initLocal(key) {
    const isKey = localStorage.getItem(key);
    if (isKey) {
      return JSON.parse(isKey);
    }
    localStorage.setItem(key, JSON.stringify([]));
    return [];
  }

  getAllData(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  saveData(key, item) {
    try {
      const data = JSON.parse(localStorage.getItem(key));
      data.unshift(item);
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('error savedata', error);
      return false;
    }
  }

  deleteData(key, id) {
    try {
      const data = this.getAllData(key);
      const filter = data.filter((d) => d.id !== id);
      localStorage.setItem(key, JSON.stringify(filter));
      return true;
    } catch (error) {
      console.error('error delete', error);
      return false;
    }
  }
}

export default new LocalStorageService();
