export default class WordsService {

    _apiBase = 'http://localhost:5000'


    _getResource = async (url) => {
        const res = await fetch(`${this._apiBase}/${url}`)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        const some = await res.json()
        return some
    }

    _setResource = async (url, data) => {
        const res = await fetch(`${this._apiBase}/${url}/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return res
    }

    _removeResource = async (url, data) => {
        const res = await fetch(`${this._apiBase}/${url}/${data.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return res
    }

    _addResource = async (url, data) => {
        const res = await fetch(`${this._apiBase}/${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return res
    }


    getAllWords = async () => {
        const res = await this._getResource('learnWords')
        return res
    }

    changeWords = async (data) => {
        let status = {
            ok: false
        }


        data.forEach((item) => {
            if (this.checkCorrectProperties(item)) {
                this.removeUnusableProps(item)
                status = this._setResource('learnWords', item)
            }
        })
        return status
    }

    removeWords = async (data) => {
        let status = {
            ok: false
        }
        data.forEach(item => {
            this.removeUnusableProps(item)
            status = this._removeResource('learnWords', item)
        })
        return status
    }

    addWords = async (data) => {
        let status = {
            ok: false
        }
        data.forEach(item => {
            if (this.checkCorrectProperties(item)) {
                status = this._addResource('learnWords', item)
            }
        })
        return status
    }

    removeUnusableProps = (item) => {
        delete item.wasChanged
        delete item.wasDeleted
        delete item.wasAdded
    }

    checkCorrectProperties = (item) => {
        if (item.word.replace(/\s/g, '') != '' && item.wordTranslation.replace(/\s/g, '') != '') {
            return true
        }
        return false
    }


}