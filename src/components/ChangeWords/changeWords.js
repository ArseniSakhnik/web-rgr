import React, {useEffect, useState} from 'react'
import WordsService from "../../services/WordsService";
import 'bootstrap/dist/css/bootstrap.css';
import './changeWords.css'
import {Link} from "react-router-dom";

export default function ChangeWords() {

    const [wordCount, setWordCount] = useState(5)
    const [data, setData] = useState([])
    const wordsService = new WordsService()

    useEffect(() => {
        wordsService.getAllWords()
            .then(response => {
                response.forEach((item) => {
                    item.wasChanged = false
                    item.wasDeleted = false
                    item.wasAdded = false
                })
                setData(response)
            })
    }, [wordCount])

    const handleChange = (e) => {
        setWordCount(e.target.value)
    }

    const dataWordChanged = (changedItem, e) => {
        const items = [...data]
        const item = {...changedItem}
        item.word = e.target.value
        item.wasChanged = true
        items[changedItem.id - 1] = item
        setData(items)
    }

    const dataWordTranslationChanged = (changedItem, e) => {
        const items = [...data]
        const item = {...changedItem}
        item.wasChanged = true
        item.wordTranslation = e.target.value
        items[changedItem.id - 1] = item
        setData(items)
    }

    const dataImgSrcChanged = (changedItem, e) => {
        const items = [...data]
        const item = {...changedItem}
        item.wasChanged = true
        item.imgSrc = e.target.value
        items[changedItem.id - 1] = item
        setData(items)
    }

    const removeWord = (removedItem) => {
        const items = [...data]
        const item = {...removedItem}
        item.wasDeleted = true
        items[removedItem.id - 1] = item
        setData(items)
    }

    const addWord = () => {
        const newItem = {
            id: data.length + 1,
            imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png",
            word: "",
            wordTranslation: "",
            wasAdded: true
        }
        const items = [...data]
        items.push(newItem)
        setData(items)
    }

    const saveDataChanges = () => {
        const changedData = data.filter((item) => item.wasChanged)
        const removedData = data.filter((item) => item.wasDeleted)
        const addedData = data.filter((item) => item.wasAdded)

        if (changedData.length > 0) {
            wordsService.changeWords(changedData).then(response => {
                if (response.ok) {
                    console.log('data was changed')
                }
            })
        }

        if (removedData.length > 0) {
            wordsService.removeWords(removedData)
                .then(response => {
                    if (response.ok) {
                        console.log('data was removed')
                    }
                })
        }

        if (addedData.length > 0) {
            wordsService.addWords(addedData)
                .then(response => {
                    if (response.ok) {
                        console.log('data was added ')
                    }
                })
        }
    }


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className={'select-words'}>
                        <select className="form-control" id="exampleFormControlSelect1" onChange={handleChange}
                                value={wordCount}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                        </select>
                    </div>
                </div>
                <Link to={'/learn-words'} className={'btn btn-primary'}>Учить слова слова</Link>
            </nav>


            <div className={'container'}>
                {data.map((item, index) => {

                    let wordClasses = "form-control "
                    let wordTranslateClasses = 'form-control '

                    if (item.word.replace(/\s/g, '') === '') {
                        wordClasses += 'red-input'
                    } else {
                        wordClasses = 'form-control'
                    }

                    if (item.wordTranslation.replace(/\s/g, '') === '') {
                        wordTranslateClasses += 'red-input'
                    } else {
                        wordTranslateClasses = 'form-control'
                    }
                    if (!item.wasDeleted && index < wordCount) {
                        return (
                            <form key={item.id}>
                                <div className="form-group">
                                    <label>Img URL</label>
                                    <input className={'form-control'} placeholder={'img url'} value={item.imgSrc}
                                           onChange={(e) => dataImgSrcChanged(item, e)}/>
                                    <label>Word</label>
                                    <input className={wordClasses} placeholder="Enter word" value={item.word}
                                           onChange={(e) => dataWordChanged(item, e)} required/>
                                    <label>Translation</label>
                                    <input className={wordTranslateClasses} id="exampleInputPassword1"
                                           placeholder="Enter word translation" value={item.wordTranslation}
                                           onChange={(e) => dataWordTranslationChanged(item, e)}
                                           required/>
                                </div>
                                <div className={'text-right'}>
                                    <button className={'btn btn-danger'} onClick={() => removeWord(item)}>Delete
                                    </button>
                                </div>
                                <hr/>
                            </form>
                        )
                    }
                })}
                <div className={'text-right'}>
                    <button className={'btn btn-primary add-btn'} onClick={addWord}>Add</button>
                    <button className={'btn btn-primary'} onClick={saveDataChanges}>Save</button>
                </div>
            </div>
        </div>
    )

}