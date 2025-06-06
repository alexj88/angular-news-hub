
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import NewsCard from '@/components/NewsCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

const API_KEY = '4d5c8c8f7f5a4c5aa35b8c5a8f5c8c8f'; // Placeholder - usuários precisarão usar sua própria chave

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
  content: string;
}

const fetchNews = async (category: string, searchQuery: string): Promise<Article[]> => {
  const baseUrl = 'https://newsapi.org/v2';
  let url = '';
  
  if (searchQuery) {
    url = `${baseUrl}/everything?q=${encodeURIComponent(searchQuery)}&apiKey=${API_KEY}&language=pt&sortBy=publishedAt&pageSize=20`;
  } else {
    url = `${baseUrl}/top-headlines?category=${category}&apiKey=${API_KEY}&language=pt&pageSize=20`;
  }
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Falha ao buscar notícias');
  }
  
  const data = await response.json();
  return data.articles || [];
};

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const { data: articles, isLoading, error, refetch } = useQuery({
    queryKey: ['news', selectedCategory, searchQuery],
    queryFn: () => fetchNews(selectedCategory, searchQuery),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [selectedCategory, searchQuery, refetch]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
  };

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={handleBackToList}
            className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Voltar às notícias
          </button>
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            {selectedArticle.urlToImage && (
              <img
                src={selectedArticle.urlToImage}
                alt={selectedArticle.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            )}
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <span>{selectedArticle.source.name}</span>
                <span>•</span>
                <span>{new Date(selectedArticle.publishedAt).toLocaleDateString('pt-BR')}</span>
                {selectedArticle.author && (
                  <>
                    <span>•</span>
                    <span>Por {selectedArticle.author}</span>
                  </>
                )}
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {selectedArticle.title}
              </h1>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {selectedArticle.description}
                </p>
                {selectedArticle.content && (
                  <p className="text-gray-700 leading-relaxed">
                    {selectedArticle.content.replace('[+', '...')}
                  </p>
                )}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <a
                      href={selectedArticle.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Leia a matéria completa no site original
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AngularNews
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Suas notícias personalizadas em tempo real
          </p>
        </div>

        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="mb-8">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {error && (
          <Alert className="mb-8 bg-red-50 border-red-200">
            <AlertDescription className="text-red-800">
              Erro ao carregar notícias. Verifique sua conexão ou tente novamente.
              <br />
              <small className="text-red-600">
                Nota: Para usar a API de notícias real, você precisa obter uma chave gratuita em https://newsapi.org/
              </small>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : articles && articles.length > 0 ? (
            articles.map((article, index) => (
              <NewsCard
                key={index}
                article={article}
                onClick={() => handleArticleClick(article)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                {searchQuery 
                  ? `Nenhuma notícia encontrada para "${searchQuery}"`
                  : 'Nenhuma notícia disponível'
                }
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
