import {useState, useEffect} from "react";


export const useFetch = (fetchFunction, params) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const paramsString = params? new URLSearchParams(params).toString() : "";

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const result = await fetchFunction(params);
                setData(result);
            } catch (e) {
                setError(e);
            } finally {
                setIsLoading(false)
            }
        })()
    }, [fetchFunction, paramsString])
    return {data, isLoading, error};
}