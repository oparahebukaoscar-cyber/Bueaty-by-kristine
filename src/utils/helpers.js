export const truncateText = (text, length = 50) => {
	if (!text) return "";
	if (text.length <= length) return text;
	return text.substring(0, length) + "...";
};
