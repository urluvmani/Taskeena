import React from 'react'

const CategoryForm = ({handleCategory,name,setname}) => {
  return (
    <div>
        <h2 className='text-xl'>Add Category</h2>
      <form onSubmit={handleCategory}>
        <input placeholder='Enter category name' className='border rounded-md border-white p-2 text-white' type="text" value={name} onChange={(e)=>setname(e.target.value)} />
        <input className='text-sm bg-yellow-500 p-2 m-2 rounded-md hover:cursor-pointer hover:font-semibold transition-all' type="submit"/>
      </form>
    </div>
  )
}

export default CategoryForm
