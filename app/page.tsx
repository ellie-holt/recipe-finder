import { SearchBar } from "@/components/Search";

export default function Home() {
  return (
    <section className="text-center py-20">
      <h2 className="text-3xl font-bold mb-6">What's in your fridge? 🥦</h2>
      <p className="mb-8 text-lg text-stone-700">
        Type in your ingredients and discover recipes you can cook right now.
      </p>
      <SearchBar />
    </section>
  );
}
