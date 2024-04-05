import { useState } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Main() {
	const [query, setQuery] = useState("");
	const [downloadingDone, setDownloadingDone] = useState(false);
	const [downloadingStarted, setDownloadingStarted] = useState(false);

	const [outputpath, setOutputPath] = useState("");
	let { data } = useSWR(`/api/${query}`, fetcher);

	const handleSubmit = (e) => {
		e.preventDefault();
		data = null;
		setDownloadingStarted(true);
		fetch(`http://127.0.0.1:8000/music/scrap/?query=${query}`)
			.then((res) => res.json())
			.then((data) => {
				setDownloadingDone(true);
				setOutputPath(data.detail);
				setDownloadingStarted(false);
			});
	};

	return (
		<div className="w-[100%] parent_div h-screen bg-white text-black">
			<p className="h-[5%] w-full text-3xl text-center">Music Downloader</p>{" "}
			<div
				className={`text-black mt-32 text-center text-5xl ${
					downloadingDone ? "block" : "hidden"
				}`}
			>
				{`Downloading Done! Music Saved at ${outputpath}`}
			</div>
			<div
				className={`text-black mt-32 text-center text-5xl ${
					downloadingStarted ? "block" : "hidden"
				}`}
			>
				{`Downloading started for ${query}`}
			</div>
			<div className="w-[100%] flex flex-col justify-start mt-44 items-center h-full  text-black ">
				<div>
					<form
						onSubmit={handleSubmit}
						className="flex flex-row justify-center items-center"
					>
						<input
							type="text"
							value={query}
							onChange={(e) => {
								setQuery(e.target.value);
							}}
							name="text"
							className="w-[600px] text-2xl h-16 border-2 p-4 pl-7 border-black rounded-lg"
							placeholder="Enter Song Name"
						/>
						<button
							type="submit"
							className="ml-10 bg-blue-400 h-16 w-[200px] rounded-lg text-white text-2xl hover:scale-125 transition-all duration-300 ease-in-out"
						>
							Search
						</button>
					</form>

					<div className="w-[600px] border-2 rounded-lg shadow-lg text-center text-white bg-[#222222] h-max">
						{data?.detail.map((suggestion, index) => {
							return (
								<div
									key={index}
									onClick={() => {
										setQuery(suggestion);
									}}
									className="p-2 hover:bg-gray-600 hover:cursor-pointer text-start pl-10 pt-4"
								>
									<p>{suggestion}</p>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
