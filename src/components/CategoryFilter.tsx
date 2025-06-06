
interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'general', name: 'Geral', emoji: '📰' },
  { id: 'technology', name: 'Tecnologia', emoji: '💻' },
  { id: 'business', name: 'Negócios', emoji: '💼' },
  { id: 'entertainment', name: 'Entretenimento', emoji: '🎬' },
  { id: 'health', name: 'Saúde', emoji: '🏥' },
  { id: 'science', name: 'Ciência', emoji: '🔬' },
  { id: 'sports', name: 'Esportes', emoji: '⚽' },
];

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-200
            ${selectedCategory === category.id
              ? 'bg-blue-600 text-white shadow-lg transform scale-105'
              : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md hover:shadow-lg'
            }
          `}
        >
          <span className="text-lg">{category.emoji}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
