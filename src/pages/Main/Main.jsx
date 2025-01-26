import styles from './styles.module.css';
import NewsBanner from "../../commponents/NewsBanner/NewsBanner.jsx";
import {useEffect, useState} from "react";
import {getNews} from "../../api/apiNews.js";
import NewsList from "../../commponents/NewsList/NewsList.jsx";
import Skeleton from "../../commponents/Skeleton/Skeleton.jsx";

const Main = () => {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchNews = async () => {
            try {
                setIsLoading(true);
                const resp = await getNews()
                setNews(resp.news)
                setIsLoading(false);
            } catch (e) {
                console.log(e);
            }
        };
        fetchNews();

    }, [])
    return (
        <main className={styles.main}>
            {news.length > 0 && !isLoading ? <NewsBanner item={news[0]}/> : (<Skeleton type={'banner'} count={1}/>)}
            {!isLoading ? <NewsList news={news}/> : <Skeleton type={'item'} count={10}/>}
        </main>
    )
}

export default Main;