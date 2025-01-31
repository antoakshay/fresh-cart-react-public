
const Loader = ({ className = '' }) => (
  <div
    role="status"
    className={`animate-spin rounded-full border-2 border-current border-t-transparent ${className}`}
    style={{ height: '1.25rem', width: '1.25rem' }}
  >
    <span className="sr-only">Loading...</span>
  </div>
);

export default Loader;
