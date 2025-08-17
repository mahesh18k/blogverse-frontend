import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

const BookmarkContext = createContext();

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const loadBookmarks = () => {
      try {
        const savedBookmarks = localStorage.getItem('blogverse_bookmarks');
        if (savedBookmarks) {
          const parsedBookmarks = JSON.parse(savedBookmarks);
          setBookmarks(parsedBookmarks);
        }
      } catch (error) {
        console.error('Error loading bookmarks:', error);
        toast.error('Failed to load bookmarks');
      } finally {
        setIsInitialized(true);
      }
    };

    loadBookmarks();
  }, []);

  // Save bookmarks to localStorage whenever bookmarks change (but only after initial load)
  useEffect(() => {
    if (!isInitialized) return; // Don't save until we've loaded from localStorage first
    
    try {
      localStorage.setItem('blogverse_bookmarks', JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Error saving bookmarks:', error);
      toast.error('Failed to save bookmarks');
    }
  }, [bookmarks, isInitialized]);

    // Add bookmark
  const addBookmark = (blog) => {
    setLoading(true);
    try {
      const isAlreadyBookmarked = bookmarks.some(bookmark => bookmark._id === blog._id);
      
      if (isAlreadyBookmarked) {
        toast.info('📚 Blog is already bookmarked!');
        setLoading(false);
        return false;
      }

      const bookmarkData = {
        _id: blog._id,
        title: blog.title,
        author: blog.author,
        date_uploaded: blog.date_uploaded,
        topic_tags: blog.topic_tags,
        thumbnail: blog.thumbnail,
        upvotes: blog.upvotes,
        downvotes: blog.downvotes,
        views: blog.views,
        bookmarked_at: new Date().toISOString()
      };

      setBookmarks(prev => [bookmarkData, ...prev]);
      toast.success('🔖 Blog bookmarked successfully!');
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Error adding bookmark:', error);
      toast.error('Failed to bookmark blog');
      setLoading(false);
      return false;
    }
  };

  // Remove bookmark
  const removeBookmark = (blogId) => {
    setLoading(true);
    try {
      setBookmarks(prev => prev.filter(bookmark => bookmark._id !== blogId));
      toast.success('🗑️ Bookmark removed successfully!');
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Error removing bookmark:', error);
      toast.error('Failed to remove bookmark');
      setLoading(false);
      return false;
    }
  };

  // Check if blog is bookmarked
  const isBookmarked = (blogId) => {
    return bookmarks.some(bookmark => bookmark._id === blogId);
  };

  // Toggle bookmark
  const toggleBookmark = (blog) => {
    if (isBookmarked(blog._id)) {
      return removeBookmark(blog._id);
    } else {
      return addBookmark(blog);
    }
  };

  // Clear all bookmarks
  const clearAllBookmarks = () => {
    setLoading(true);
    try {
      setBookmarks([]);
      toast.success('🧹 All bookmarks cleared!');
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Error clearing bookmarks:', error);
      toast.error('Failed to clear bookmarks');
      setLoading(false);
      return false;
    }
  };

  // Get bookmarks count
  const getBookmarksCount = () => bookmarks.length;

  // Search bookmarks
  const searchBookmarks = (query) => {
    if (!query || query.trim() === '') return bookmarks;

    const lowercaseQuery = query.toLowerCase();
    return bookmarks.filter(bookmark =>
      bookmark.title.toLowerCase().includes(lowercaseQuery) ||
      bookmark.author?.first_name?.toLowerCase().includes(lowercaseQuery) ||
      bookmark.author?.last_name?.toLowerCase().includes(lowercaseQuery) ||
      bookmark.topic_tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  };

  // Sort bookmarks
  const sortBookmarks = (sortBy = 'date') => {
    const sorted = [...bookmarks].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.bookmarked_at) - new Date(a.bookmarked_at);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          const authorA = `${a.author?.first_name || ''} ${a.author?.last_name || ''}`;
          const authorB = `${b.author?.first_name || ''} ${b.author?.last_name || ''}`;
          return authorA.localeCompare(authorB);
        case 'upvotes':
          return b.upvotes - a.upvotes;
        default:
          return new Date(b.bookmarked_at) - new Date(a.bookmarked_at);
      }
    });
    return sorted;
  };

  const value = {
    bookmarks,
    loading,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark,
    clearAllBookmarks,
    getBookmarksCount,
    searchBookmarks,
    sortBookmarks
  };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkContext;
