import axios from 'axios';
import { API_URL } from '../config';

export const tagService = {
  getAllTags: async () => {
    try {
      const response = await axios.get(`${API_URL}/tags`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  },

  getTagById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/tags/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tag:', error);
      throw error;
    }
  },

  createTag: async (tagData) => {
    try {
      const response = await axios.post(`${API_URL}/tags`, tagData);
      return response.data;
    } catch (error) {
      console.error('Error creating tag:', error);
      throw error;
    }
  },

  updateTag: async (id, tagData) => {
    try {
      const response = await axios.put(`${API_URL}/tags/${id}`, tagData);
      return response.data;
    } catch (error) {
      console.error('Error updating tag:', error);
      throw error;
    }
  },

  deleteTag: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/tags/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting tag:', error);
      throw error;
    }
  }
}; 