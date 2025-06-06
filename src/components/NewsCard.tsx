
interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  author: string;
}

interface NewsCardProps {
  article: Article;
  onClick: () => void;
}

const NewsCard = ({ article, onClick }: NewsCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <article
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden group"
    >
      {article.urlToImage ? (
        <div className="relative overflow-hidden">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
          <span className="text-blue-600 font-semibold">Sem imagem</span>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
            {article.source.name}
          </span>
          <span>•</span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
        
        <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 text-lg leading-tight group-hover:text-blue-600 transition-colors">
          {article.title}
        </h3>
        
        {article.description && (
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
            {article.description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          {article.author && (
            <span className="text-xs text-gray-500">
              Por {article.author}
            </span>
          )}
          <span className="text-blue-600 text-sm font-medium group-hover:text-blue-800 transition-colors">
            Ler mais →
          </span>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
