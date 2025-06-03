import axios from 'axios';
import { API_URL } from '../config';

export const commentService = {
  getCommentsByPostId: async (postId) => {
    try {
      const response = await axios.get(`${API_URL}/comments/post/${postId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  },

  createComment: async (commentData) => {
    try {
      const response = await axios.post(`${API_URL}/comments`, commentData);
      return response.data;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  },

  updateComment: async (id, commentData) => {
    try {
      const response = await axios.put(`${API_URL}/comments/${id}`, commentData);
      return response.data;
    } catch (error) {
      console.error('Error updating comment:', error);
      throw error;
    }
  },

  deleteComment: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/comments/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  }
}; 