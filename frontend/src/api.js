import axios from "axios";

const API_URL = "http://localhost:5000/api/reviews";

export const getReviews = async () => axios.get(API_URL);
export const addReview = async (review) => axios.post(API_URL, review);
export const updateReview = async (id, review) => axios.put(`${API_URL}/${id}`, review);
export const deleteReview = async (id) => axios.delete(`${API_URL}/${id}`);
