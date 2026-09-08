import { Portal } from "@ark-ui/react/portal";
import { Maximize2, Minus, X } from "lucide-react";
import {
  Button,
  FloatingPanel,
  FloatingPanelBody,
  FloatingPanelCloseTrigger,
  FloatingPanelContent,
  FloatingPanelControl,
  FloatingPanelDragTrigger,
  FloatingPanelHeader,
  FloatingPanelPositioner,
  FloatingPanelStageTrigger,
  FloatingPanelTitle,
  FloatingPanelTrigger,
} from "@/components/react";

export default function FloatingPanelOverview() {
  return (
    <div className="flex justify-center">
      <FloatingPanel defaultSize={{ width: 300, height: 200 }}>
        <FloatingPanelTrigger asChild>
          <Button variant="outline">Open the inspector</Button>
        </FloatingPanelTrigger>

        <Portal>
          <FloatingPanelPositioner>
            <FloatingPanelContent>
              <FloatingPanelHeader>
                <FloatingPanelDragTrigger>
                  <FloatingPanelTitle>Inspector</FloatingPanelTitle>
                </FloatingPanelDragTrigger>
                <FloatingPanelControl>
                  <FloatingPanelStageTrigger stage="minimized" aria-label="Minimise">
                    <Minus />
                  </FloatingPanelStageTrigger>
                  <FloatingPanelStageTrigger stage="maximized" aria-label="Maximise">
                    <Maximize2 />
                  </FloatingPanelStageTrigger>
                  <FloatingPanelCloseTrigger aria-label="Close">
                    <X />
                  </FloatingPanelCloseTrigger>
                </FloatingPanelControl>
              </FloatingPanelHeader>
              <FloatingPanelBody>
                Drag the header to move this, and the edges to resize it.
              </FloatingPanelBody>
            </FloatingPanelContent>
          </FloatingPanelPositioner>
        </Portal>
      </FloatingPanel>
    </div>
  );
}
