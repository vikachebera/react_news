import styles from './styles.module.css';
import NewsBanner from "../../commponents/NewsBanner/NewsBanner.jsx";
import {useEffect, useState} from "react";
import {getNews} from "../../api/apiNews.js";
import NewsList from "../../commponents/NewsList/NewsList.jsx";

const Main = () => {
    const [news, setNews] = useState([]);
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const resp = await getNews()
                setNews(resp.news)
            } catch (e) {
                console.log(e);
            }
        };
        fetchNews();

    }, [])
    return (
        <main className={styles.main}>
            {news.length>0?<NewsBanner item={news[0]}/>: null}
            <NewsList news={news}/>
        </main>
    )
}

export default Main;