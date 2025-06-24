const scrollToAnchor = (hash: string | null) => {
  if (!hash) return;
  
  const id = hash.replace('#', '');
  const element = document.getElementById(id);
  
  if (element) {
    setTimeout(() => {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
};

export default scrollToAnchor;
