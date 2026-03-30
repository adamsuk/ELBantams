import { useState } from 'react';
import { Button, Text, Group } from '@mantine/core';
import { IconDeviceFloppy, IconCheck, IconX } from '@tabler/icons-react';
import type { AppData } from '../../types';

interface Props {
  data: AppData;
  originalData: AppData;
}

const FILE_MAP: { key: keyof Pick<AppData, 'club' | 'teams' | 'committee' | 'registration' | 'news' | 'gallery' | 'matchday'>; file: string; wrap?: boolean }[] = [
  { key: 'club', file: 'website/public/data/club.json' },
  { key: 'teams', file: 'website/public/data/teams.json' },
  { key: 'committee', file: 'website/public/data/committee.json' },
  { key: 'registration', file: 'website/public/data/registration.json', wrap: true },
  { key: 'news', file: 'website/public/data/news.json', wrap: true },
  { key: 'gallery', file: 'website/public/data/gallery.json', wrap: true },
  { key: 'matchday', file: 'website/public/data/matchday.json', wrap: true },
];

export function SaveButton({ data, originalData }: Props) {
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<'success' | 'error' | 'nochanges' | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setResult(null);

    try {
      const changedFiles: { file: string; content: unknown }[] = [];

      for (const { key, file, wrap } of FILE_MAP) {
        const currentJson = JSON.stringify(data[key]);
        const originalJson = JSON.stringify(originalData[key]);
        if (currentJson !== originalJson) {
          changedFiles.push({
            file,
            content: wrap ? { items: data[key] } : data[key],
          });
        }
      }

      if (changedFiles.length === 0) {
        setResult('nochanges');
        return;
      }

      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ files: changedFiles }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error ?? 'Failed to save');
      }

      setResult('success');
    } catch {
      setResult('error');
    } finally {
      setSaving(false);
      setTimeout(() => setResult(null), 5000);
    }
  };

  return (
    <Group gap="sm">
      <Button
        leftSection={<IconDeviceFloppy size={16} />}
        onClick={handleSave}
        loading={saving}
        color={result === 'success' ? 'green' : result === 'error' ? 'red' : undefined}
      >
        {result === 'success' ? 'Saved!' : result === 'error' ? 'Error' : result === 'nochanges' ? 'No changes' : 'Save to Site'}
      </Button>
      {result === 'success' && (
        <Group gap={4}>
          <IconCheck size={14} color="green" />
          <Text size="xs" c="green">Changes committed — site will redeploy shortly</Text>
        </Group>
      )}
      {result === 'error' && (
        <Group gap={4}>
          <IconX size={14} color="red" />
          <Text size="xs" c="red">Failed to save — check console for details</Text>
        </Group>
      )}
    </Group>
  );
}
