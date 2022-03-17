import React, { useState } from 'react'
import { Link } from 'react-router-dom';



function Searchbar({ placeholder, data }) {

    const [filterData, setFilterData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");


    const handleFilter = (event) => {

        const searchedWord = event.target.value;
        setWordEntered(searchedWord);


        const newFilter = data.filter((value) => {
            return value.name.toLowerCase().includes(searchedWord.toLowerCase());
        });



        if (searchedWord === "") {
            setFilterData([])
        } else {
            setFilterData(newFilter);
        }
    }

    const clearInput = () => {
        setFilterData([]);
        setWordEntered("");


    }


    return (

        <div className="search" >

            <div className="searchInputs">
                <input type="text" placeholder={placeholder} value={wordEntered} onChange={handleFilter} />

                <div className="searchIcon">
                    {filterData.length === 0 ? <div> </div> : <div id="clearBtn" onClick={clearInput}> X</div>}

                </div>

            </div>
            {filterData.length !== 0 &&
                <div className="dataResult">
                    {filterData.slice(0, 30).map((value, i) => {
                        return <Link to={`/coin/${value.id}`} onClick={() => clearInput()}><a className="dataItem data-item-a" href={`/coin/${value.id}`} key={i}>
                            <p> <img src={value.icon} alt="" /> {value.name} ({value.symbol})   </p>
                        </a>
                        </Link>
                    })}
                </div>
            }


        </div>
    )
}

export default Searchbar
