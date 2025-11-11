import useCategory from "../hooks/useCategory"
import { Link } from 'react-router-dom'
const AllCategory = () => {
    const Category = useCategory()
  return (
    <div>
      {Category&& Category.map((c)=>{
        return <div className='m-2' key={c._id}>
           <Link to={`/category/${c.slug}`}> {c.name}</Link>
        </div>
      })}
    </div>
  )
}

export default AllCategory
