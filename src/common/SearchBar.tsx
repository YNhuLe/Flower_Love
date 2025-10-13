import Button from "./Button";

import { FaSearch } from "react-icons/fa";
function SearchBar() {

    return (
        <section className="border-b-2 w-full">
            <form className="mt-[5.5rem] mx-4 pb-8 ">
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grey w-4 h-4" />
                    <input type="text" placeholder="Search for plants..." className="w-full bg-lightGrey border rounded-full p-2 pl-10 focus:border-2 focus:border-grey focus:outline-none" />

                </div>
            </form></section>
    )
}
export default SearchBar;