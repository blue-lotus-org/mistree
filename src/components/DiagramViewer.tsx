import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import mermaid from 'mermaid';
import type { DiagramData } from '../types';

interface Props {
  data: DiagramData | null;
}

export default function DiagramViewer({ data }: Props) {
  const [svg, setSvg] = React.useState<string>('');

  React.useEffect(() => {
    if (data?.mermaid) {
      mermaid.render('diagram', data.mermaid).then(({ svg }) => {
        setSvg(svg);
      });
    }
  }, [data]);

  if (!data) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Enter a GitHub URL to generate a diagram
      </div>
    );
  }

  return (
    <TransformWrapper>
      <TransformComponent>
        <div dangerouslySetInnerHTML={{ __html: svg }} />
      </TransformComponent>
    </TransformWrapper>
  );
}