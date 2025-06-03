import axios from 'axios';
import { API_URL } from '../config';

export const groupService = {
  getAllGroups: async () => {
    try {
      const response = await axios.get(`${API_URL}/groups`);
      return response.data;
    } catch (error) {
      console.error('Error fetching groups:', error);
      throw error;
    }
  },

  getGroupById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/groups/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching group:', error);
      throw error;
    }
  },

  createGroup: async (groupData) => {
    try {
      const response = await axios.post(`${API_URL}/groups`, groupData);
      return response.data;
    } catch (error) {
      console.error('Error creating group:', error);
      throw error;
    }
  },

  updateGroup: async (id, groupData) => {
    try {
      const response = await axios.put(`${API_URL}/groups/${id}`, groupData);
      return response.data;
    } catch (error) {
      console.error('Error updating group:', error);
      throw error;
    }
  },

  deleteGroup: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/groups/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting group:', error);
      throw error;
    }
  }
}; 