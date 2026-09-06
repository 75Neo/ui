import { Steps } from "@75neo/react/steps";

const items = [
  { title: "Contact", description: "Name and email" },
  { title: "Date", description: "Pick a day" },
  { title: "Rooms", description: "Choose a room" },
];

export function StepsPreview() {
  return <Steps items={items} defaultStep={1} />;
}
