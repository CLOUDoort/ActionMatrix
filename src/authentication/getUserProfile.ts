import supabase from '@/services/supabase';

export const getUserProfile = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('Error getting user');

  const {
    id,
    user_metadata: { full_name, avatar_url },
  } = user;
  localStorage.setItem('userId', id);

  const userProfile = {
    id,
    username: full_name,
    avatar_url,
    updated_at: new Date(),
  };

  const { error: upsertError } = await supabase.from('profiles').upsert([userProfile]);

  if (upsertError) throw new Error(`Error upserting profile: ${upsertError}`);

  return { name: userProfile.username, avatarUrl: userProfile.avatar_url };
};
