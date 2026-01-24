"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCategories } from "@/lib/data";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface CategoryNavProps {
  isMobile?: boolean;
}

export function CategoryNav({ isMobile = false }: CategoryNavProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
      setLoading(false);
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className={cn("flex gap-4", isMobile ? "flex-col" : "items-center justify-center border-b border-border/40")}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-24" />
        ))}
      </div>
    );
  }

  const navClasses = cn(
    "flex",
    isMobile
      ? "flex-col space-y-2"
      : "items-center justify-center space-x-6 border-b border-border/40"
  );
  
  const linkClasses = (slug: string) => cn(
    "text-sm font-medium transition-colors hover:text-primary",
    pathname === `/category/${slug}` ? "text-primary" : "text-muted-foreground",
    !isMobile && "py-3"
  );

  return (
    <nav className={navClasses}>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/category/${category.slug}`}
          className={linkClasses(category.slug)}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
}
