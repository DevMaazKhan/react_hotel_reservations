import { useEffect, useState } from "react";

export const useContainerDimensions = (myRef) => {
	const getDimensions = () => ({
		width: myRef.current.offsetWidth,
	});

	const [dimensions, setDimensions] = useState({ width: 0 });

	useEffect(() => {
		const handleResize = () => {
			setDimensions(getDimensions());
		};

		if (myRef.current) {
			setDimensions(getDimensions());
		}

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [myRef]);

	function recalculate() {
		setDimensions(getDimensions());
	}

	return { width: dimensions.width, recalculate };
};
