import styles from "./styles.module.css";

const Categories = ({category, setSelectedCategory, selectedCategory}) => {
    return (
        <div className={styles.category}>
            {category.map((category) => {
                return (
                    <button key={category} className={selectedCategory === category ? styles.active : styles.item}
                            onClick={() => setSelectedCategory(category)}>{category}</button>

                )
            })}
        </div>
    )
}
export default Categories;