export type ViewMode = 'runner' | 'canvas' | 'tokens' | 'code';
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export interface StitchScreen {
  id: string;
  name: string;
  slug: string;
  type: 'mobile' | 'web';
  description: string;
  thumbnail: string;
  route: string;
  status: 'published' | 'draft' | 'review';
  componentsCount: number;
  lastEdited: string;
  codeSnippet: string;
}

export interface DesignToken {
  name: string;
  category: 'color' | 'typography' | 'spacing' | 'radius';
  value: string;
  cssVariable: string;
  description: string;
}

export interface ProjectMetadata {
  id: string;
  url: string;
  title: string;
  version: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  createdDate: string;
  updatedDate: string;
  screens: StitchScreen[];
  activeScreenId: string;
  tokens: DesignToken[];
}
