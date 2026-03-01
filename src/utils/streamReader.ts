/**
 * Utility for reading streaming responses from ReadableStream
 * Handles TextDecoder internally and calls onChunk callback for each chunk
 */

/**
 * Read a ReadableStream and call onChunk for each decoded text chunk
 * @param stream - The ReadableStream to read from
 * @param onChunk - Callback function called with each decoded chunk
 * @returns Promise that resolves when the stream is complete
 */
export async function readStream(
  stream: ReadableStream<Uint8Array>,
  onChunk: (chunk: string) => void
): Promise<void> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();

  try {
    while (true) {
      const { value, done } = await reader.read();

      if (done) {
        break;
      }

      // Decode chunk and call callback
      const chunk = decoder.decode(value, { stream: true });
      onChunk(chunk);
    }
  } finally {
    reader.releaseLock();
  }
}

