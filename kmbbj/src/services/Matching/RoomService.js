export const fetchSortedRooms = async (sortConditionDTO) => {
  const response = await fetch("/room/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sortConditionDTO),
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to fetch rooms");
  }
};
