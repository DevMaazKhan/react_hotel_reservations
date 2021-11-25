import React, { memo, useEffect, useRef, useState } from "react";

export const RowWithHover = memo(() => {
	const ref = useRef(null);
	const [bgColor, setBgColor] = useState("transparent");

	useEffect(() => {
		const parentEl = document.getElementById("hover");
		parentEl.addEventListener("mousemove", hovering);
		parentEl.addEventListener("mouseleave", out);

		return () => parentEl.removeEventListener("mousemove", hovering);
	}, []);

	function out() {
		setBgColor("transparent");
	}

	function hovering(e) {
		if (ref.current) {
			const child = ref.current.getBoundingClientRect();
			if (
				e.clientX >= child.left &&
				e.clientX <= child.right &&
				e.clientY >= child.top &&
				e.clientY <= child.bottom
			) {
				setBgColor("rgba(227, 245, 252, .9)");
			} else {
				setBgColor("transparent");
			}
		}
	}

	return (
		<div
			ref={ref}
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				backgroundColor: bgColor,
				pointerEvents: "none",
			}}
		></div>
	);
});
