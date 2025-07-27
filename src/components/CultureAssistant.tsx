import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Globe, Sparkles } from "lucide-react";
import { knowledgeBase, type CultureTopic } from "@/lib/knowledgeBase";
import { translateText } from "@/lib/translation";

export default function CultureAssistant() {
  const [question, setQuestion] = useState("");
  const [language, setLanguage] = useState("english");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [foundTopic, setFoundTopic] = useState<CultureTopic | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setAnswer("");
    setFoundTopic(null);

    try {
      let searchQuery = question;
      
      // If question is in Telugu, translate to English first
      if (language === "telugu") {
        searchQuery = await translateText(question, "te", "en");
      }

      // Search knowledge base
      const topic = searchKnowledgeBase(searchQuery);
      
      if (topic) {
        setFoundTopic(topic);
        let response = topic.description;
        
        // If language is Telugu, translate answer back to Telugu
        if (language === "telugu") {
          response = await translateText(response, "en", "te");
        }
        
        setAnswer(response);
      } else {
        const notFoundMessage = "I couldn't find information about that topic. Please ask about Indian festivals like Diwali, Holi, Pongal, Ganesh Chaturthi, or Raksha Bandhan.";
        const finalMessage = language === "telugu" 
          ? await translateText(notFoundMessage, "en", "te")
          : notFoundMessage;
        setAnswer(finalMessage);
      }
    } catch (error) {
      setAnswer("Sorry, there was an error processing your question. Please try again.");
    }

    setIsLoading(false);
  };

  const searchKnowledgeBase = (query: string): CultureTopic | null => {
    const lowerQuery = query.toLowerCase();
    return knowledgeBase.find(topic => 
      topic.name.toLowerCase().includes(lowerQuery) ||
      topic.keywords.some(keyword => lowerQuery.includes(keyword.toLowerCase()))
    ) || null;
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-cultural bg-clip-text text-transparent mb-4">
            🌏 BharatCulture AI Assistant
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the rich heritage and traditions of India. Ask me about festivals, 
            customs, and cultural practices in English or Telugu!
          </p>
        </div>

        {/* Search Form */}
        <Card className="max-w-2xl mx-auto p-6 shadow-warm mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder={language === "telugu" ? "భారతీయ పండుగలు, సంప్రదాయాల గురించి అడగండి..." : "Ask about Indian festivals, traditions, or culture..."}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="h-12 text-base"
                />
              </div>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full sm:w-40 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      English
                    </div>
                  </SelectItem>
                  <SelectItem value="telugu">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      తెలుగు (Telugu)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  Searching...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Ask Question
                </div>
              )}
            </Button>
          </form>
        </Card>

        {/* Answer Display */}
        {answer && (
          <Card className="max-w-4xl mx-auto p-8 shadow-cultural">
            {foundTopic && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-primary mb-2">
                  {foundTopic.name}
                </h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {foundTopic.keywords.map((keyword, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed text-foreground">
                {answer}
              </p>
            </div>
          </Card>
        )}

        {/* Knowledge Base Preview */}
        <div className="max-w-4xl mx-auto mt-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-primary">
            Available Topics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {knowledgeBase.map((topic, index) => (
              <Card key={index} className="p-4 hover:shadow-warm transition-shadow">
                <h4 className="font-semibold text-primary mb-2">{topic.name}</h4>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {topic.description.substring(0, 100)}...
                </p>
                <div className="flex flex-wrap gap-1">
                  {topic.keywords.slice(0, 3).map((keyword, i) => (
                    <span 
                      key={i}
                      className="px-2 py-1 bg-accent/20 text-accent-foreground rounded text-xs"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}