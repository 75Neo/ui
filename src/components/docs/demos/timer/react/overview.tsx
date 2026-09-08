import {
  Timer,
  TimerActionTrigger,
  TimerArea,
  TimerControl,
  TimerItem,
  TimerSeparator,
} from "@/components/react";

export default function TimerOverview() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Timer startMs={90 * 60 * 1000} countdown autoStart>
        <TimerArea>
          <TimerItem type="hours" />
          <TimerSeparator>:</TimerSeparator>
          <TimerItem type="minutes" />
          <TimerSeparator>:</TimerSeparator>
          <TimerItem type="seconds" />
        </TimerArea>

        <TimerControl>
          <TimerActionTrigger action="start">Start</TimerActionTrigger>
          <TimerActionTrigger action="pause">Pause</TimerActionTrigger>
          <TimerActionTrigger action="reset">Reset</TimerActionTrigger>
        </TimerControl>
      </Timer>
    </div>
  );
}
