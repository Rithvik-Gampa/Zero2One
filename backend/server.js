const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

app.post('/api/explain', (req, res) => {
  const { concept, level } = req.body;
  
  console.log(`🤖 Explaining "${concept}" (${level} level) with llama3...`);

  const ollama = spawn('ollama', ['run', 'llama3:latest'], { 
    stdio: ['pipe', 'pipe', 'pipe'],
    timeout: 0 
  });

  let output = '';
  const timeout = setTimeout(() => {
    ollama.kill();
    res.json({ explanation: '⏱️ Thinking... (llama3 warming up - normal for first request)' });
  }, 45000); // 45s for llama3

  // llama3 optimized prompt
  const prompt = `You are "Explain Like I'm New" AI tutor. Explain "${concept}" at ${level} level only.

Format EXACTLY like this:
📖 **EXPLANATION**
[2-3 simple sentences]

💡 **EXAMPLES** 
1. [Example 1]
2. [Example 2]

❓ **PRACTICE QUESTIONS**
Q1: [Question 1]
Q2: [Question 2] 
Q3: [Question 3]

Keep total under 350 words. Make it engaging for engineering students!`;

  ollama.stdin.write(prompt + '\n');
  ollama.stdin.end();

  ollama.stdout.on('data', (data) => {
    output += data.toString();
  });

  ollama.stderr.on('data', (data) => {
    console.log('Ollama stderr:', data.toString());
  });

  ollama.on('close', (code) => {
    clearTimeout(timeout);
    console.log('✅ llama3 finished');
    if (code === 0 && output.trim().length > 50) {
      res.json({ explanation: output.trim() });
    } else {
      res.json({ 
        explanation: `⚠️ llama3 needs warmup. Try again or run: ollama run llama3:latest "test"` 
      });
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ status: '🚀 Study Companion running!', model: 'llama3:latest' });
});

app.listen(PORT, () => {
  console.log(`🚀 Study Companion: http://localhost:${PORT}`);
  console.log('📱 Frontend auto-served!');
  console.log('✅ Using your llama3:latest (4.7GB)');
});
