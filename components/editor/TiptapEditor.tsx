"use client";

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import { useCallback } from 'react';
import imageCompression from 'browser-image-compression';
import { getSignedUploadUrl } from '@/app/community/actions';
import { toast } from 'sonner';
import { Bold, Italic, Strikethrough, Code, Image as ImageIcon, Youtube as YoutubeIcon, List, ListOrdered } from 'lucide-react';

const EditorToolbar = ({ editor }: { editor: Editor | null }) => {
    if (!editor) return null;

    const addYoutubeVideo = () => {
        const url = prompt('Enter YouTube URL');
        if (url) {
            editor.chain().focus().setYoutubeVideo({ src: url }).run();
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) { // 10MB
            toast.error('이미지 파일은 10MB를 초과할 수 없습니다.');
            return;
        }

        const options = {
            maxSizeMB: 1, // 최대 1MB로 압축
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };

        try {
            toast.info('이미지를 압축하고 있습니다...');
            const compressedFile = await imageCompression(file, options);
            
            toast.info('업로드 주소를 받고 있습니다...');
            const { success, error, signedUrl, path, publicUrl } = await getSignedUploadUrl(compressedFile.name, compressedFile.type);
            
            if (error || !success) {
                toast.error(`업로드 실패: ${error}`);
                return;
            }
            
            toast.info('이미지를 업로드하고 있습니다...');
            const response = await fetch(signedUrl, {
                method: 'PUT',
                body: compressedFile,
                headers: { 'Content-Type': compressedFile.type },
            });

            if (!response.ok) {
                 toast.error('Supabase 스토리지 업로드에 실패했습니다.');
                 return;
            }

            editor.chain().focus().setImage({ src: publicUrl }).run();
            toast.success('이미지가 성공적으로 업로드되었습니다.');

        } catch (error) {
            console.error(error);
            toast.error('이미지 처리 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="border border-gray-300 rounded-t-md p-2 flex flex-wrap gap-2">
            <input
                type="file"
                id="image-upload"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
            <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-gray-300 p-1 rounded' : 'p-1 rounded'}><Bold size={16} /></button>
            <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-gray-300 p-1 rounded' : 'p-1 rounded'}><Italic size={16} /></button>
            <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'bg-gray-300 p-1 rounded' : 'p-1 rounded'}><Strikethrough size={16} /></button>
            <button type="button" onClick={() => editor.chain().focus().toggleCode().run()} className={editor.isActive('code') ? 'bg-gray-300 p-1 rounded' : 'p-1 rounded'}><Code size={16} /></button>
            <button type="button" onClick={() => document.getElementById('image-upload')?.click()}><ImageIcon size={16} /></button>
            <button type="button" onClick={addYoutubeVideo}><YoutubeIcon size={16} /></button>
            <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'bg-gray-300 p-1 rounded' : 'p-1 rounded'}><List size={16} /></button>
            <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'bg-gray-300 p-1 rounded' : 'p-1 rounded'}><ListOrdered size={16} /></button>
        </div>
    );
};


interface TiptapEditorProps {
    content: string;
    onChange: (richText: string) => void;
    placeholder?: string;
}

export default function TiptapEditor({ content, onChange, placeholder }: TiptapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                inline: false, // 이미지를 인라인으로 처리하지 않음
            }),
            Youtube.configure({
                nocookie: true,
                modestBranding: true,
            }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert max-w-none w-full border border-gray-300 rounded-b-md p-4 min-h-[300px] focus:outline-none',
            },
        },
    });

    return (
        <div>
            <EditorToolbar editor={editor} />
            <EditorContent editor={editor} placeholder={placeholder} />
        </div>
    );
} 