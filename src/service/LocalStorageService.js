class LocalStorageService {
    initLocal(key) {
        let isKey = localStorage.getItem(key);
        if (isKey) {
            return JSON.parse(isKey);
        } else {
            localStorage.setItem(key, JSON.stringify([]));
            return [];
        }
    }

    getAllData(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    saveData(key, item) {
        try {
            let data = JSON.parse(localStorage.getItem(key));
            data.unshift(item);
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    deleteData(key, id) {
        try {
            let data = this.getAllData(key);
            let filter = data.filter((d) => d.id !== id);
            localStorage.setItem(key, JSON.stringify(filter));
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

export default new LocalStorageService();
