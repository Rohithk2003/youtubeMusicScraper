import { useState } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Main() {
	const [searchSuggestions, setSearchSuggestions] = useState([]);
	const [query, setQuery] = useState("");
	const { data } = useSWR(`/api/${query}`, fetcher);

	const handleSubmit = (e) => {
		e.preventDefault();

		fetch(`http://127.0.0.1:8000/music/scrap/?query=${query}`)
			.then((res) => res.json())
			.then((data) => {
				setSearchSuggestions(data);
			});
	};

	return (
		<div className="h-[100vh] w-[100%] bg-white text-black">
			<div className="w-[100%] flex flex-col justify-center items-center h-full  text-black ">
				<p className="h-[20%] w-full text-3xl text-center">
					Music Downloaderdd
				</p>

				<div>
					<form className="flex flex-row justify-center items-center">
						<input
							type="text"
							value={query}
							onChange={(e) => {
								setQuery(e.target.value);
								handleInputChange(e);
							}}
							name="text"
							className="w-[600px] text-2xl h-20 border-2 p-4 pl-7 border-black rounded-lg"
							placeholder="Enter Song Name"
						/>
					</form>
				</div>
			</div>
			<div className="w-[400px] text-center text-black h-[400px]">
				<p>d</p>
				{data?.map((suggestion, index) => {
					return (
						<div
							key={index}
							className="flex flex-row justify-center items-center"
						>
							<p>{suggestion}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}
