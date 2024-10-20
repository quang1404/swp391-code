function formatDate(date) {
    if (!(date instanceof Date) || isNaN(date)) {
      return "Invalid Date"; 
    }
  
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options); 
  }
  
  module.exports = {
    formatDate
  };