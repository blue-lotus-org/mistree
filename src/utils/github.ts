import { Octokit } from 'octokit';

export function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== 'github.com') {
      return null;
    }

    const parts = parsed.pathname.split('/').filter(Boolean);
    if (parts.length < 2) {
      return null;
    }

    return {
      owner: parts[0],
      repo: parts[1],
    };
  } catch {
    return null;
  }
}

export async function fetchRepositoryStructure(url: string) {
  const parsed = parseGitHubUrl(url);
  if (!parsed) {
    throw new Error('Invalid GitHub repository URL');
  }

  const octokit = new Octokit();
  const { owner, repo } = parsed;

  // Fetch repository contents
  const { data: contents } = await octokit.rest.repos.getContent({
    owner,
    repo,
    path: '',
  });

  // Build tree structure
  const tree = {
    nodes: [repo],
    edges: [] as [string, string][],
  };

  if (Array.isArray(contents)) {
    for (const item of contents) {
      tree.nodes.push(item.name);
      tree.edges.push([repo, item.name]);
    }
  }

  return {
    mermaid: generateMermaidDiagram(tree),
    json: JSON.stringify(tree, null, 2),
    type: 'graph',
  };
}

function generateMermaidDiagram(tree: { nodes: string[]; edges: [string, string][] }) {
  const lines = ['graph TD'];
  
  tree.edges.forEach(([from, to]) => {
    lines.push(`    ${sanitizeId(from)}[${from}] --> ${sanitizeId(to)}[${to}]`);
  });

  return lines.join('\n');
}

function sanitizeId(str: string): string {
  return str.replace(/[^a-zA-Z0-9]/g, '_');
}