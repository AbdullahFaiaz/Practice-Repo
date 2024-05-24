/* eslint-disable react/prop-types */

import ProductCard from "../../Components/ProductCard";
export function CountriesSection({
  coolThree,
  allProducts,
  handlePrevPage,
  pages,
  currentPage,
  setCurrentPage,
  handleNextPage,
  itemsPerPage,
  handleItemsChange
}) {
  return <div>
                <div className="flex flex-col items-center justify-center text-[#a26f36] text-[4.6vw] lg:text-[3vw] font-bold pt-[3vw] mt-[4vw] pb-[2vw]">Countries Section</div>
                <div style={{
      backgroundImage: `url(${coolThree})`
    }} className="py-[3vw] bg-cover bg-center">

        <div className="px-[1vw] py-[2vw] grid grid-cols-2 md:grid-cols-3 gap-4">
            {allProducts.map(product => <ProductCard key={product._id} product={product}></ProductCard>)}
        </div>
            </div>
            {
      /* <p>Current Page: {currentPage}</p> */
    }
            <div className="text-center">
            <button onClick={handlePrevPage} className="m-1 bg-slate-400 px-2 rounded-sm">Prev</button>
            {pages.map(page => <button className={`${currentPage === page ? 'm-1 bg-orange-400 px-2 rounded-sm' : 'm-1 bg-slate-400 px-2 rounded-sm'}`} onClick={() => setCurrentPage(page)} key={page}>{page}</button>)}
            <button onClick={handleNextPage} className="m-1 bg-slate-400 px-2 rounded-sm">Next</button>
            <select value={itemsPerPage} onChange={handleItemsChange} name="" id="">
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="6">6</option>
            </select>
            </div>
            </div>;
}
  