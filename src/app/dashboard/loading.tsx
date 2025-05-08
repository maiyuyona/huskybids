export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="animate-pulse">
        <div className="h-20 bg-gray-200 rounded-lg mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
} 