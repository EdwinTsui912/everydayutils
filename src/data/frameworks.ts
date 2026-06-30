import type { PromptFramework } from '../types/promptforge';

export const PROMPT_FRAMEWORKS: PromptFramework[] = [
  {
    id: 'costar',
    name: 'CO-STAR',
    description: 'Most complete framework for high precision.',
    bestFor: ['writing', 'marketing', 'business'],
    icon: 'target',
    fields: [
      { id: 'context', label: 'Context', placeholder: 'Provide background information...', inputType: 'textarea', required: true, tooltip: 'Background for the model.', maxLength: 600, xmlTag: 'context' },
      { id: 'objective', label: 'Objective', placeholder: 'What exactly do you want to achieve?', inputType: 'textarea', required: true, tooltip: 'Clear goal.', maxLength: 400, xmlTag: 'objective' },
      { id: 'style', label: 'Style', placeholder: 'e.g. professional, concise, step-by-step', inputType: 'text', required: false, tooltip: 'Writing style.', xmlTag: 'style' },
      { id: 'tone', label: 'Tone', placeholder: 'e.g. formal, friendly, authoritative', inputType: 'text', required: false, tooltip: 'Emotional tone.', xmlTag: 'tone' },
      { id: 'audience', label: 'Audience', placeholder: 'Who is this for?', inputType: 'text', required: false, tooltip: 'Target audience.', xmlTag: 'audience' },
      { id: 'response', label: 'Response Format', placeholder: 'e.g. bullet points, table, JSON', inputType: 'text', required: true, tooltip: 'Exact output format.', xmlTag: 'response_format' },
    ],
    templateString: (data) => {
      const parts = [
        `Context: ${data.context ?? ''}`,
        `Objective: ${data.objective ?? ''}`,
      ];
      if (data.style) parts.push(`Style: ${data.style}`);
      if (data.tone) parts.push(`Tone: ${data.tone}`);
      if (data.audience) parts.push(`Audience: ${data.audience}`);
      parts.push(`Response Format: ${data.response ?? ''}`);
      return parts.join('\n\n').trim();
    },
  },

  {
    id: 'rtf',
    name: 'RTF',
    description: 'Role → Task → Format. Fast and effective.',
    bestFor: ['coding', 'writing', 'analysis'],
    icon: 'zap',
    fields: [
      {
        id: 'role',
        label: 'Role',
        placeholder: 'e.g. Act as a senior React developer with TypeScript expertise',
        inputType: 'textarea',
        required: true,
        tooltip: 'Define the persona or expertise level the model should adopt.',
        maxLength: 200,
        xmlTag: 'role',
      },
      {
        id: 'task',
        label: 'Task',
        placeholder: 'e.g. Write a custom React hook that debounces any input value',
        inputType: 'textarea',
        required: true,
        tooltip: 'The specific action you need.',
        maxLength: 500,
        xmlTag: 'task',
      },
      {
        id: 'format',
        label: 'Format',
        placeholder: 'e.g. Return clean TypeScript code with JSDoc comments and a usage example',
        inputType: 'textarea',
        required: true,
        tooltip: 'Desired output structure.',
        maxLength: 300,
        xmlTag: 'format',
      },
    ],
    templateString: (data) =>
      `You are ${data.role ?? ''}.\n\nTask: ${data.task ?? ''}\n\nOutput Format: ${data.format ?? ''}`.trim(),
  },

  {
    id: 'craft',
    name: 'CRAFT',
    description: 'Great for creative and marketing work.',
    bestFor: ['marketing', 'creative'],
    icon: 'palette',
    fields: [
      { id: 'character', label: 'Character / Context', placeholder: 'You are an expert...', inputType: 'textarea', required: true, tooltip: 'Persona + context.', maxLength: 300, xmlTag: 'character' },
      { id: 'request', label: 'Request', placeholder: 'Create / Write / Analyze...', inputType: 'textarea', required: true, tooltip: 'Main request.', maxLength: 400, xmlTag: 'request' },
      { id: 'assets', label: 'Assets / Resources', placeholder: 'Product details, facts...', inputType: 'textarea', required: false, tooltip: 'Materials you provide.', maxLength: 500, xmlTag: 'assets' },
      { id: 'focus', label: 'Focus / Constraints', placeholder: 'Emphasize X, avoid Y', inputType: 'textarea', required: false, tooltip: 'What to focus on.', maxLength: 300, xmlTag: 'focus' },
      { id: 'tune', label: 'Tune (Tone & Style)', placeholder: 'Warm, professional...', inputType: 'text', required: false, tooltip: 'Final tone instructions.', xmlTag: 'tune' },
    ],
    templateString: (data) => {
      const parts = [data.character ?? ''];
      parts.push(`Request: ${data.request ?? ''}`);
      if (data.assets) parts.push(`Assets:\n${data.assets}`);
      if (data.focus) parts.push(`Focus:\n${data.focus}`);
      if (data.tune) parts.push(`Tone & Style: ${data.tune}`);
      return parts.join('\n\n').trim();
    },
  },

  {
    id: 'race',
    name: 'RACE',
    description: 'Role → Action → Context → Expectations.',
    bestFor: ['business', 'analysis'],
    icon: 'briefcase',
    fields: [
      { id: 'role', label: 'Role', placeholder: 'You are a senior...', inputType: 'textarea', required: true, tooltip: 'Expert role.', maxLength: 250, xmlTag: 'role' },
      { id: 'action', label: 'Action', placeholder: 'Analyse / Create / Write...', inputType: 'textarea', required: true, tooltip: 'Specific action.', maxLength: 400, xmlTag: 'action' },
      { id: 'context', label: 'Context', placeholder: 'Additional background...', inputType: 'textarea', required: true, tooltip: 'Situational context.', maxLength: 500, xmlTag: 'context' },
      { id: 'expectations', label: 'Expectations', placeholder: 'Return as a table with...', inputType: 'textarea', required: true, tooltip: 'Success criteria.', maxLength: 400, xmlTag: 'expectations' },
    ],
    templateString: (data) =>
      [
        `Role: ${data.role ?? ''}`,
        `Action: ${data.action ?? ''}`,
        `Context: ${data.context ?? ''}`,
        `Expectations: ${data.expectations ?? ''}`,
      ].join('\n\n').trim(),
  },
];