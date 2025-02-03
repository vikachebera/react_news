import styles from './styles.module.css';
import NewsBanner from "../../commponents/NewsBanner/NewsBanner.jsx";
import {getCategories, getNews} from "../../api/apiNews.js";
import NewsList from "../../commponents/NewsList/NewsList.jsx";
import Pagination from "../../commponents/Pagination/Pagination.jsx";
import Categories from "../../commponents/Categories/Categories.jsx";
import Search from "../../commponents/Search/Search.jsx";
import {useDebounce} from "../../commponents/helpers/hooks/useDebounce.js";
import {PAGE_SIZE, TOTAL_PAGES} from "../../constant/constant.js";
import {useFetch} from "../../commponents/helpers/hooks/useFetch.js";
import {useFilters} from "../../commponents/helpers/hooks/useFilters.js";
// import categories from "../../commponents/Categories/Categories.jsx";

const Main = () => {
    const {filters, changeFilter} = useFilters({
        page_number: 1,
        page_size: PAGE_SIZE,
        category: null,
        keywords: '',
    });

    const debouncedKeywords = useDebounce(filters.keywords, 1500);


    const {data, isLoading} = useFetch(getNews,
        {
            ...filters,
            keywords: debouncedKeywords,
        })
    const {data: dataCategories} = useFetch(getCategories);

    const handleNextPage = () => {
        if (filters.page_number < TOTAL_PAGES) {
            changeFilter('page_number', filters.page_number + 1);
        }
    }
    const handlePreviousPage = () => {
        if (filters.page_number > 1) {
            changeFilter('page_number', filters.page_number - 1);
        }
    }

    const handlePageClick = (pageNumber) => {
        changeFilter('page_number', pageNumber);
    }
    return (
        <main className={styles.main}>
            {dataCategories ?
                <Categories
                    category={dataCategories.categories}
                    selectedCategory={filters.category}
                    setSelectedCategory={(category) => changeFilter('category', category)}/>
                : null}
            <Search keywords={filters.keywords} setKeywords={(keywords) => changeFilter('keywords', keywords)}/>

            <NewsBanner isLoading={isLoading} item={data && data.news && data.news[0]}/>

            <Pagination handleNextPage={handleNextPage}
                        handlePreviousPage={handlePreviousPage}
                        handlePageClick={handlePageClick}
                        currentPage={filters.page_number}
                        totalPages={TOTAL_PAGES}/>

            <NewsList isLoading={isLoading} news={data?.news}/>


            <Pagination handleNextPage={handleNextPage}
                        handlePreviousPage={handlePreviousPage}
                        handlePageClick={handlePageClick}
                        currentPage={filters.page_number}
                        totalPages={TOTAL_PAGES}/>
        </main>
    )
}

export default Main;