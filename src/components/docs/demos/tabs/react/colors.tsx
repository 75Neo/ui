import { Tabs, TabsIndicator, TabsList, TabsTrigger } from "@/components/react";

const colors = ["primary", "info", "success", "error"] as const;

export default function TabsColors() {
  return (
    <div className="flex flex-col gap-8">
      {colors.map((color) => (
        <Tabs key={color} color={color} defaultValue="one">
          <TabsList>
            <TabsTrigger value="one">{color}</TabsTrigger>
            <TabsTrigger value="two">Second</TabsTrigger>
            <TabsIndicator />
          </TabsList>
        </Tabs>
      ))}
    </div>
  );
}
