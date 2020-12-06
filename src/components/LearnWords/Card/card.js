import React, {useEffect} from 'react'
import Tasks from "./Tasks";

export default function Card({animationPlayer, imgSrc, word, wordTranslation, data, changeAnimationType}) {



    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                    <div className="tile">
                        <div className="wrapper">
                            <div className="header">Learning card</div>
                            <div className="quest-img">
                                <img
                                    src={imgSrc}
                                    alt="Image 1"/>
                            </div>
                            <p className="task-word">{wordTranslation}</p>
                            <hr/>
                            <Tasks animationPlayer={animationPlayer} wordTranslation={wordTranslation} word={word}
                                   data={data} changeAnimationType={changeAnimationType}/>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}