import React from "react";

const Pagination = ({ foodsPerPage, foods, changePage, currentPage }) => {

    const pages = []

    const handlePrevious = () => {
        if(currentPage > 1) {
            changePage(currentPage - 1)
        }
    }

    const handleNext = () => {
        if(currentPage >= 1){
            changePage(currentPage + 1)
        }
    }
    for(let i = 0; i <= Math.ceil(foods.length / foodsPerPage); i++){
        pages.push(i + 1)
    }
    
    return(
        <div>
            <ul>
                <li><span onClick={handlePrevious}>Atras</span></li>
                {pages &&
                    pages.map(page =>
                        (page === currentPage
                            ?(<li><button>{page}</button></li>)
                            :(<li><button onClick={() => changePage(page)}>{page}</button></li>))
                        )
                }
                <li><span onClick={handleNext}>Siguiente</span></li>
            </ul>
        </div>
    )

}

export default Pagination